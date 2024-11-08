import { Link } from "@/i18n/routing";
import { useRandomGradient } from "@/app/hooks/useRandomGradient";

export default function RandomGradientLogo() {
  const gradient = useRandomGradient();

  return (
    <Link
      className="text-4xl font-bold bg-clip-text text-transparent"
      style={{ backgroundImage: gradient }}
      href="/"
    >
      MusicBlog
    </Link>
  );
}
