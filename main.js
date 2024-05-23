import './style.css'

function readableBytes(bytes) {
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]; 
}

let image = document.querySelector('#image');
image.addEventListener('change', async function() {
  
  // GET IMAGE
  const imageFile = this.files[0];

  // SET OPTIONS
  const options = {
    maxSizeMB: .3,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  }

  try {
    const compressedFile = await imageCompression(imageFile, options);

    // DISPLAY FILE SIZES
    document.querySelector('#original-size').textContent = readableBytes(imageFile.size);
    document.querySelector('#new-size').textContent = readableBytes(compressedFile.size);

    // SET OUTFUT IMAGE
    let output = document.querySelector('#output');
    output.src = URL.createObjectURL(compressedFile);

    // SHOW HIDDEN ELEMENTS
    let infoContainer = document.querySelector('#info-container');
    infoContainer.styles.display = 'flex';

    let dlContainer = document.querySelector('#dl-container');
    dlContainer.styles.display = 'flex';

    // SET SOURCE IN DL BUTTON
    let dl = document.querySelector('#download-link');
    dl.setAttribute('href', output.src);
  } catch(error) {
    console.log(error);
  }
})

// Ajustar o código para referência:

// async function handleImageUpload(event) {

//   const imageFile = event.target.files[0];
//   console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
//   console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

//   const options = {
//     maxSizeMB: 1,
//     maxWidthOrHeight: 1920,
//     useWebWorker: true,
//   }
//   try {
//     const compressedFile = await imageCompression(imageFile, options);
//     console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
//     console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

//     await uploadToServer(compressedFile); // write your own logic
//   } catch (error) {
//     console.log(error);
//   }

// }
