import {
  TagHeader,
  AboutHeader,
  ContactHeader,
} from "@/app/[locale]/components/headers";

interface TagHeaderWrapperProps {
  tag: string | string[];
}

export function TagHeaderWrapper({ tag }: TagHeaderWrapperProps) {
  return <TagHeader tag={tag} />;
}

export function AboutHeaderWrapper() {
  return <AboutHeader />;
}

export function ContactHeaderWrapper() {
  return <ContactHeader />;
}
