import ThemeForm from './ui/theme-form';

export default function ThemePage({ params }: { params: { productId: string; announcementId: string } }) {
	return <ThemeForm productId={params.productId} announcementId={params.announcementId} />;
}
