exports.validateMusicUpload = (data) => {
  const { title, artist, fileUrl } = data;
  
  if (!title?.trim()) {
    return 'Title is required';
  }
  if (!artist?.trim()) {
    return 'Artist name is required';
  }
  if (!fileUrl?.trim()) {
    return 'Music file URL is required';
  }
  if (!fileUrl.endsWith('.mp3')) {
    return 'Only MP3 files are allowed';
  }
  
  return null;
};