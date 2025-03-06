
import { useState } from "react";

export default function WorkLogForm() {
  const [name, setName] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  return (
    <div>
      <input placeholder="Nombre y Apellido" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Local" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <textarea placeholder="Descripción" value={workDescription} onChange={(e) => setWorkDescription(e.target.value)} />
    </div>
  );
}
