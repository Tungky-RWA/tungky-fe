"use client"

import type React from "react"

import { useState, useRef, type DragEvent } from "react"

import { Upload, X, ImageIcon } from "lucide-react"
import { Label } from "../UI/label"
import { Input } from "../UI/input"

interface EnhancedLogoUploaderProps {
  onLogoChange?: (file: File | null) => void
  className?: string
}

export default function EnhancedLogoUploader({ onLogoChange, className = "" }: EnhancedLogoUploaderProps) {
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file)
      setLogoPreviewUrl(url)
      setFileName(file.name)
      onLogoChange?.(file)
    } else {
      setLogoPreviewUrl(null)
      setFileName("")
      onLogoChange?.(null)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    handleLogoChange(file)
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.match(/^image\/(png|jpeg|svg\+xml)$/)) {
        handleLogoChange(file)
      }
    }
  }

  const handleRemove = () => {
    handleLogoChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Label htmlFor="brandLogo" className="text-[#FAFAFA] text-sm font-medium">
        Brand Logo
      </Label>

      <div className="relative">
        {/* Hidden file input */}
        <Input
          ref={fileInputRef}
          id="brandLogo"
          name="brandLogo"
          type="file"
          accept="image/png, image/jpeg, image/svg+xml"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload area */}
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-300 ease-in-out
            ${
              isDragOver
                ? "border-violet-400 bg-violet-500/10 scale-[1.02]"
                : "border-gray-600 hover:border-violet-500 hover:bg-violet-500/5"
            }
            ${logoPreviewUrl ? "bg-black/20" : "bg-black/10"}
          `}
        >
          {logoPreviewUrl ? (
            <div className="space-y-4">
              {/* Preview Image */}
              <div className="relative inline-block">
                <img
                  src={logoPreviewUrl || "/placeholder.svg"}
                  alt="Logo Preview"
                  className="h-54 w-auto max-w-full rounded-lg shadow-lg border border-gray-700"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove()
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200 shadow-lg"
                >
                  <X size={14} />
                </button>
              </div>

              {/* File info */}
              <div className="space-y-2">
                <p className="text-[#FAFAFA] text-sm font-medium truncate max-w-xs mx-auto">{fileName}</p>
                <p className="text-gray-400 text-xs">Click to change or drag a new image</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Upload icon */}
              <div className="mx-auto w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-violet-400" />
              </div>

              {/* Upload text */}
              <div className="space-y-2">
                <p className="text-[#FAFAFA] text-lg font-medium">Upload your brand logo</p>
                <p className="text-gray-400 text-sm">Drag and drop your image here, or click to browse</p>
                <p className="text-gray-500 text-xs">Supports PNG, JPEG, and SVG files</p>
              </div>

              {/* Upload button */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-md transition-colors duration-200">
                  <ImageIcon size={16} />
                  Choose File
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* File format info */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <div className="flex gap-1">
          <span className="px-2 py-1 bg-black/30 rounded text-gray-400">PNG</span>
          <span className="px-2 py-1 bg-black/30 rounded text-gray-400">JPEG</span>
          <span className="px-2 py-1 bg-black/30 rounded text-gray-400">SVG</span>
        </div>
        <span>• Max file size: 5MB</span>
      </div>
    </div>
  )
}
