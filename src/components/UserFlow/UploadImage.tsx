import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Prop{
  imageUrl: string | null;
  setImageUrl:(url: string) => void;
}
const UploadImage : React.FC<Prop> = ({imageUrl , setImageUrl})=>{
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImageUrl(response.data.imageUrl);

      const response2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/upload-temp?imageUrl=${response.data.imageUrl}`);
      if (!response2.ok) throw new Error('Failed to fetch signed URL');

      const data = await response2.json();
      setSignedUrl(data.signedUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 flex flex-col items-center justify-center p-4 rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Upload An Image</h1>
      <div className="w-full max-w-sm bg-gray-50 p-4 rounded-lg shadow-md">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3 w-full p-2 border border-gray-400 rounded-lg shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpload}
          className={`bg-blue-600 text-white w-full px-4 py-2 rounded-lg shadow-lg transition duration-200 ease-in-out hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-.5 8H4z"></path>
              </svg>
              Uploading...
            </div>
          ) : (
            'Upload'
          )}
        </button>
        {signedUrl && (
          <div className="mt-4 p-2 bg-white rounded-lg shadow-md">
            <p className="text-green-600 font-semibold">Image uploaded successfully:</p>
            <Image src={signedUrl} alt="Uploaded" height={150} width={225} className="mt-2 rounded-lg shadow-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;