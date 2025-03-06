import { useState } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function WorkLogForm() {
  const [name, setName] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [workType, setWorkType] = useState("Presupuesto nuevo");
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        return getDownloadURL(storageRef);
      })
    );

    const data = {
      name,
      workDescription,
      location,
      date,
      workType,
      images: uploadedImages,
    };

    await addDoc(collection(db, "worklogs"), data);
    alert("Datos guardados correctamente en Firebase!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nombre y Apellido" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Local" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <textarea placeholder="Descripción" value={workDescription} onChange={(e) => setWorkDescription(e.target.value)} required />

      <label>Tipo de trabajo:</label>
      <select value={workType} onChange={(e) => setWorkType(e.target.value)}>
        <option>Presupuesto nuevo</option>
        <option>Garantía</option>
      </select>

      <input type="file" multiple onChange={handleImageUpload} />

      <button type="submit">Enviar y guardar en Firebase</button>
    </form>
  );
}

