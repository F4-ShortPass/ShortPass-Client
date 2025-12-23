import PdfUpload from '@components/FileUpload';

const Step3DocumentUpload = ({ formData, setFormData }) => {
  const handleFileChange = (file) => {
    setFormData(prev => ({
      ...prev,
      portfolioPdfs: [...(prev.portfolioPdfs || []), file]
    }));
  };

  const handleRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      portfolioPdfs: prev.portfolioPdfs.filter((_, i) => i !== index)
    }));
  };

  return (
    <PdfUpload
      label='PDF 업로드'
      files={formData.portfolioPdfs}
      onFileChange={handleFileChange}
      onRemove={handleRemove}
      required
    />
  );
};

export default Step3DocumentUpload;