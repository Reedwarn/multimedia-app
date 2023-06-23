import React, { useState, useEffect } from 'react';
import { data } from './data';
import { Header } from "./components/Header";
import { AudioPlayer } from './components/AudioPlayer';
import { DocumentViewer } from './components/DocumentViewer';
import { VideoPlayer } from './components/VideoPlayer';
import { ImageViewer } from './components/ImageViewer';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register necessary Chart.js elements and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
export default function App() {
  const [myFiles, setMyFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePath, setFilePath] = useState("/file-server/")
  const [showChartModal, setShowChartModal] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Load initial file data on component mount
  useEffect(() => {
    setMyFiles(data)
  }, [])
  // Options for the bar chart
  var barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Files Breakdown',
      },
    },
  };

  // Handle file filter change
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // Handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const id = myFiles.length + 1;
    const fileName = prompt("Enter the filename", file.name);

    if (fileName) {
      const isValidFilename = validateFilename(fileName);

      if (isValidFilename) {
        const existingFile = myFiles.find((firstFile) => firstFile.name === fileName);

        if (existingFile) {
          const replaceFile = window.confirm(
            "Filename already exists. Do you want to replace the file?"
          );

          if (replaceFile) {
            const updatedFiles = myFiles.map((replacedFile) => {
              if (replacedFile.id === existingFile.id) {
                return {
                  ...replacedFile,
                  name: fileName,
                  type: getFileType(file),
                  path: filePath + file.name
                };
              }
              return replacedFile;
            });

            setMyFiles(updatedFiles);
          }
        } else {
          const newFile = {
            id: id,
            name: fileName,
            type: getFileType(file),
            path: filePath + file.name
          };

          setMyFiles([...myFiles, newFile]);
        }
      } else {
        alert("Invalid filename. Please enter a valid filename.");
      }
    }else {
      alert("Filename cannot be empty. Please enter a valid filename.");
    }
  };

  // Validate filename
  const validateFilename = (filename) => {
    if (/^\s*$/.test(filename)) {
      return false; // Invalid if filename contains only whitespace
    }
  
    if (filename.includes('/')) {
      return false; // Invalid if filename contains a forward slash
    }
  
    return true; // Valid filename
  };

  const checkDuplicateFilename = (filename) => {
    return myFiles.some((file) => file.name === filename);
  };

  // Get file type based on file extension
  const getFileType = (file) => {
    const extension = file.name.split('.').pop();
    switch (extension.toLowerCase()) {
      case 'mp4':
      case 'mov':
      case 'avi':
      case 'mkv':
        return 'video';
      case 'mp3':
      case 'wav':
      case 'm4a':
        return 'audio';
      case 'pdf':
      case 'doc':
      case 'docx':
        return 'document';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'heic':
        return 'image';
      default:
        return 'unknown';
    }
  };

  const filteredFiles = selectedFilter === 'all' ? myFiles : myFiles.filter((file) => file.type === selectedFilter);

  return (
    <>
      {showChartModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <p style={{ fontWeight: "bold" }}>Files Breakdown</p>
              <button style={styles.closeButton} onClick={() => setShowChartModal(false)}>close</button>
            </div>
            <div style={styles.modalBody}>
              <Pie
                data={{
                  labels: ['Video', 'Audio', 'Document', 'Image'],
                  datasets: [
                    {
                      label: 'Files Breakdown',
                      data: [myFiles.filter(file => file.type === 'video').length, myFiles.filter(file => file.type === 'audio').length, myFiles.filter(file => file.type === 'document').length, myFiles.filter(file => file.type === 'image').length],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
              <Bar
                data={{
                  labels: ['Video', 'Audio', 'Document', 'Image'],
                  datasets: [
                    {
                      label: 'Files Breakdown',
                      data: [myFiles.filter(file => file.type === 'video').length, myFiles.filter(file => file.type === 'audio').length, myFiles.filter(file => file.type === 'document').length, myFiles.filter(file => file.type === 'image').length],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={barChartOptions}
              />
            </div>
          </div>
        </div>
      )}
      <div className="App">
        <Header />
        <div style={styles.container}>
          <div style={{ padding: 10, paddingBottom: 0, }}>
            <p style={{ fontWeight: "bold" }}>My Files</p>
            <p>{selectedFile ? selectedFile.path : filePath}</p>
          </div>
          <div style={styles.controlTools}>
            <button style={styles.controlButton}
              onClick={() => {
                if (selectedFile) {
                  const newFileName = prompt("Enter new name", selectedFile.name);
                  if (newFileName) {
                    const isValidFilename = validateFilename(newFileName);
                    if (isValidFilename) {
                      const existingFile = myFiles.find((file) => file.name === newFileName);
                    if (existingFile) {
                      alert("Filename already exists. Please choose a different filename.");
                    } else {
                      const newFiles = myFiles.map((file) => {
                        if (file.id === selectedFile.id) {
                          return {
                            ...file,
                            name: newFileName,
                          };
                        }
                        return file;
                      });
                      setMyFiles(newFiles)
                      setSelectedFile(null)
                    }
                    }else {
                      alert("Invalid filename. Please enter a valid filename.");
                    }
                  }else {
                    alert("Filename cannot be empty. Please enter a valid filename.");
                  }
                }
              }}
            >Rename</button>
            <button style={styles.controlButton}
              onClick={() => {
                setShowChartModal(true)
              }}
            >Files Breakdown</button>
            <button style={styles.controlButton}
              onClick={() => {
                if (selectedFile) {
                  window.open(selectedFile.path, "_blank")
                }
              }}
            >Download</button>
            <button style={styles.controlButton}
              onClick={() => {
                if (selectedFile) {
                  const updatedFiles = myFiles.filter(file => file.id !== selectedFile.id);
                  setMyFiles(updatedFiles);
                  setSelectedFile(null);
                }
              }}
            >Delete</button>
            <button style={styles.controlButton}>
              <input
                type="file"
                id="uploadInput"
                style={{ display: 'none' }}
                onChange={handleUpload}
              />
              <label htmlFor="uploadInput" style={{ display: 'flex', display: 'flex', }}>
                <span style={{ marginRight: '5px' }}><img width="24" height="24" src="https://img.icons8.com/sf-black/64/upload.png" alt="upload" /></span>Upload File
              </label>
            </button>
            <div style={styles.filterContainer}>
              <div><span><img width="24" height="24" src="https://img.icons8.com/material-two-tone/24/filter--v1.png" alt="filter--v1" /></span></div>
              <select value={selectedFilter} onChange={handleFilterChange} style={styles.filterDropdown}>
                <option value="all">All</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="document">Document</option>
                <option value="image">Image</option>
              </select>
            </div>

            <div>
            </div>
          </div>
          <div style={styles.fileContainer}>
            <div style={{ width: "100%", padding: 10 }}>
              {filteredFiles.map((file) => {

                if (file.path.slice(0, filePath.length) === filePath) {
                  return (
                    <div style={styles.file} className="files" key={file.id} onClick={() => {
                      if (selectedFile && selectedFile.id === file.id) {
                        setSelectedFile(null)
                        return
                      }
                      setSelectedFile(file)
                    }}>
                      <p>{file.name}</p>
                    </div>
                  )
                }
              })}
            </div>
            {selectedFile && (
              <div style={styles.fileViewer}>
                {selectedFile.type === 'video' && (
                  <VideoPlayer path={selectedFile.path} />
                )}
                {selectedFile.type === 'audio' && (
                  <AudioPlayer path={selectedFile.path} />
                )}
                {selectedFile.type === 'document' && (
                  <DocumentViewer path={selectedFile.path} />
                )}
                {selectedFile.type === 'image' && (
                  <ImageViewer path={selectedFile.path} />
                )}
                <p style={{ fontWeight: "bold", marginTop: 10 }}>{selectedFile.name}</p>
                <p>path: <span style={{ fontStyle: "italic" }}>{selectedFile.path}</span></p>
                <p>file type: <span style={{ fontStyle: "italic" }}>{selectedFile.type}</span></p>
              </div>

            )}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    color: '#000',
  },
  fileContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',

  },
  file: {
    backgroundColor: '#eee',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    width: '100%',
  },
  fileViewer: {
    padding: '10px',
    margin: '10px',
    width: '30vw',
    height: '100vh',
    cursor: 'pointer',
    borderLeft: '1px solid #000'
  },
  controlTools: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '10px',
  },
  controlButton: {
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  // modal
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    height: '50vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '10px',
    cursor: 'pointer',
  },
  modalBody: {
    width: '100%',
    height: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '10px',
  },
  modalHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  closeButton: {
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: '#eee',
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },

  filterDropdown: {
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#eee',
    color: '#333',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  filterIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    marginRight: '10px',
    fontSize: '20px',
    color: '#fff',
  },
  filterIconSymbol: {
    fontSize: '20px',
  }

};