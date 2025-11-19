'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone'
import { IconFile, IconFolderCode, IconPlus } from "@tabler/icons-react"
import { v4 as uuidv4 } from 'uuid';
import uploadImage from '@/lib/core/upload-client'

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import styles from "./file-upload.module.css";
import { CampaignBriefSchema } from '@/lib/schema';

type FileWithPreview = File & {
  preview: string;
}

export default function Upload() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [campaignData, setCampaignData] = useState();

  const generateCampaignHeros = useCallback(async (campaignId: string, files: FileWithPreview[], payload?: object) => {
    if (!payload) {
      console.error('Campaign data required!');
      return;
    }

    const brief = CampaignBriefSchema.parse({
      campaignId,
      ...payload,
    })

    const imagesToUpload = files.filter(f => f.type.includes('image')).map(async f => {
      const response = await uploadImage(`${campaignId}/products/${f.name}`, f, {})
      return {
        name: f.name,
        url: response.url
      };
    })

    const uploads = await Promise.all(imagesToUpload)

    if(uploads.length > 0) {
      brief.products = brief.products.map(p => {
        const productImage = uploads.find(upload => upload.name.indexOf(p.id as string) > -1)
        if(productImage) {
          return {
            ...p,
            image: productImage.url
          }
        }
        return p;
      })
    }

    const response = await fetch('/api/campaigns/generate', {
      method: 'POST',
      body: JSON.stringify(brief)
    })
    const data = await response.json();
    console.log('Campaign generation response:', data);

    // Reset the file uploads
    setFiles([])
  }, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))]);
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    if (files.length > 0) {
      const file = files.filter(f => f.type.includes('json'))[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          try {
            setCampaignData(JSON.parse(e.target?.result as string));
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        };
        reader.readAsText(file);
      }
    }
  }, [files])

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>Create Campaign</EmptyTitle>
        <EmptyDescription>
          <p>Get started by uploading files for products, manifest (campaign.json) and brand assets.</p>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <section {...getRootProps()}>
          <div className='rounded-full px-8 py-4 bg-muted border border-dashed'>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop, or click to browse files</p>
            }
          </div>
        </section>
        <section>
          {files.filter(file => file.type.indexOf('image') !== -1).map(file => (
            <div className={styles.thumb} key={file.name}>
              <div className={styles.thumbInner}>
                <img
                  src={file.preview}
                  className={styles.img}
                  onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
              </div>
            </div>
          ))}
          <ul>
            {files.filter(file => file.type.indexOf('image') === -1).map(file => (
              <li key={file.name} className='flex items-center'>
                <IconFile />
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="flex gap-2">
          <Button onClick={() => generateCampaignHeros(uuidv4(), files, campaignData)}>Generate Campaign <IconPlus /></Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}