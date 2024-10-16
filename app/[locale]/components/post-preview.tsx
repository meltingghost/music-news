import CoverImage from "@/components/cover-image";
import { Link } from "@/i18n/routing";

type Props = {
  title: string;
  coverImage: string;
  date: Date;
  excerpt: string;
  slug: string;
};

export function PostPreview({ title, coverImage, date, excerpt, slug }: Props) {
  return (
    <div>
      <Link href={`/posts/${slug}`} className="hover:underline">
        <div className="mb-5">
          <CoverImage title={title} src={coverImage} />
        </div>
        <h3 className="text-3xl mb-3 leading-snug">{title}</h3>
      </Link>
      <div className="text-lg mb-4">
        <p>{date.toLocaleDateString()}</p>
      </div>
      <p className="text-lg leading-relaxed mb-4 line-clamp-4">{excerpt}</p>
    </div>
  );
}
