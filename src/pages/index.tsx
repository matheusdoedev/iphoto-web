import { HowItWorks, Intro, Footer, Seo } from '~/components';

function Home(): JSX.Element {
  return (
    <>
      <Seo title="Home" />
      <Intro />
      <HowItWorks />
      <Footer />
    </>
  );
}

export default Home;
