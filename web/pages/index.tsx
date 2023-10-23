import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Hero from '@/components/Hero';
import { getPostsByLocale } from '@/utils/posts';
import ArticlesDisplay from '@/components/ArticlesDisplay';

type Props = {
	// Add custom props here
	articles: any;
};

const Homepage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { t } = useTranslation('common');

	return (
		<>
			<main className="w-full flex min-h-screen flex-col items-center bg-customWhite dark:bg-customDark text-black dark:text-white">
				<div className="flex w-full p-3 text-sm items-center justify-center font-semibold bg-customGray text-white dark:bg-customBitcoin">
					{t('Free Bitcoin Ordinals Education')}
				</div>
				{/* <Header heading={t('h1')} title={t('title')} /> */}
				<Hero />
				<div className="w-full max-w-7xl mt-20">
					<div className="items-start flex justify-between">
						<h1 className="text-xl mb-6">Latest Releases</h1>
					</div>
					<div className="p-6 max-w-7xl">
						<ArticlesDisplay articles={_props.articles} />
					</div>
				</div>
			</main>
		</>
	);
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
	const allPostsData = getPostsByLocale(locale || 'en');

	return {
		props: {
			articles: allPostsData,
			...(await serverSideTranslations(locale || 'en', [
				'common',
				'footer',
			])),
		},
	};
};

export default Homepage;
