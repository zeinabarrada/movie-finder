import { useParams } from "next/navigation";

export default function MovieDetailsPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h1>Movie Details for ID: {id}</h1>
    </div>
  );
}
