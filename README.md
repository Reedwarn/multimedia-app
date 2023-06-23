# Multimedia_App_Bounty
This is a React application that provides file management functionalities. It allows users to upload, rename, delete, and download files, as well as view different types of files such as audio, video, documents, and images.
-------------------------------------------------------------------------
#### EXISTING FEATURES:
- Rename files: Users can rename the uploaded files.
- File breakdown: Users can view a pie chart and a bar chart that show the distribution of file types in the file list.
- Download files: Users can download files by clicking the download button.
- Delete files: Users can delete files from the file list.
- View files: Users can click on a file to view it in the file viewer section.

#### NEW ADDITIONS:
- Upload files: A multimedia app is incomplete without an upload feature, as it helps the app to complete its function of data storage. With this feature, users can select and upload files from their local system. After selecting the file of their choice, the user is prompted to enter a name to save the file with, this feature validates the filename using a `validateFilename` event handler, this handler checks the name entered and ensures it is not empty and does not contain unwanted characters like forward slashes, this is to prevent the name from messing with the filepath. The upload feature also prevents saving two different files with the same name, in any case the user enters an already existing name while uploading a file, they get a prompt asking if they'd like to replace the existing file, as the name they entered already existed.
- File filtering: Users can filter the file list by file type (video, audio, document, or image).This feature helps the user to narrow down searching for a file, in the case they forget the name they saved the file with, they can easily select the filetype in the filter dropdown and get all files with that filetype, this reduces the search field and makes finding files easier.

#### NOTE: 
- Just like in the `Upload` feature, the `Rename` feature was also modified, to validate filenames before renaming, and prevent saving two files with the same name. So, if a user tries to rename a file with an already existing name, they get prompted to choose another name, as the filename already existed. This was done to complement the `Upload` feature, since 'preventing duplicate filenames' was included in it, and leaving the `Rename` feature as it was would defeat that purpose.
----------------------------------------------------------------------------
## EXPLANATION OF THE CODE:

### Importing Dependencies:
- `React`, `useState`, and `useEffect` are imported from the 'react' package to enable the use of React hooks.
- `data` is imported from a local file (`data.js`) and represents the initial file data.

### Importing Components:
- The `Header` component is imported from './components/Header'.
- The `AudioPlayer`, `DocumentViewer`, `VideoPlayer`, and `ImageViewer` components are imported from their respective locations.
- Various Chart.js components and configurations are imported.

### Function Component:
- The `App` function component is defined, which represents the main application component.

### State Variables:
Several state variables are initialized using the `useState` hook:
- `myFiles` represents the array of files and is initially set to the data imported from `data.js`.
- `selectedFile` represents the currently selected file and is initially set to `null`.
- `filePath` represents the file server path and is initially set to "/file-server/".
- `showChartModal` is a boolean flag to control the display of the chart modal and is initially set to `false`.
- `selectedFilter` represents the selected filter option and is initially set to 'all'.

### useEffect Hook:
- The `useEffect` hook is used to set the initial `myFiles` state using the data imported from `data.js`. This effect runs only once during component initialization.

### Bar Chart Options:
- `barChartOptions` represents the configuration options for the bar chart displayed in the modal.

### Event Handlers:
The contract provides several functions for managing quests and player interactions, including:
- `handleFilterChange` is an event handler triggered when the filter option changes. It updates the `selectedFilter` state.
- `handleUpload` is an event handler triggered when a file is uploaded. It prompts the user to enter the name they wish to store the uploaded file with, validates the filename, ensure filename doesn't already exist and updates the `myFiles` state accordingly. In the case the filename entered already exists, it propmts to replace the existing file with the new uploaded file.
- `validateFilename` is a helper function to validate the filename entered by the user. It ensures the filename is not empty and does not contain unwanted characters like forward slashes. Doing this prevents the filename from messing with the filepath.
- `getFileType` is a helper function that determines the file type based on its extension.

### Rendered JSX:
The JSX represents the structure and components of the application.
- The chart modal displays a pie chart and a bar chart representing the file type breakdown.
- The `Rename` button allows the user to rename the selected file, it throws an alert when an already existing name is entered, thereby, preventing duplicate filenames.
- The `Files Breakdown` button triggers the display of the chart modal when clicked.
- The `Download` button opens up the selected file and thereafter enables downloading the file using the file viewer's built in download feature.
- The `Delete` button allows the user to delete the selected file, it does this by hiding the selected file from the list of files.
- The `Upload` button uses the input element to allow users to upload files. It triggers the `handleUpload` event handler when clicked.
- The `file filter select` element enables users to filter files based on their type.
- The preview modal displays the selected file using the appropriate component based on its type (audio, document, video, or image).

The code provides file management functionality, allowing users to upload, filter, rename, delete, and download files. It also presents a chart modal with visualizations of the file type breakdown.