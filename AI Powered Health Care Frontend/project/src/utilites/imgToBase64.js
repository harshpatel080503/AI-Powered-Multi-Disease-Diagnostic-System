function imageToBase64Browser(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]); 
        reader.onerror = error => reject(error);
    });
}

export default imageToBase64Browser;
