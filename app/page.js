import Footer from './components/Footer';
import FormInput from './components/FormInput';
import Layout from './components/Layout';

export default function Home() {
  return (
    <>
      <Layout>
        <div className="w-full h-[50vh] flex flex-col items-center px-10 md:p-10 mt-14">
          <h1 className="text-xl font-bold">
            <span className="text-[#4E4FEB] text-[45px]">Zseev</span> Short Link
          </h1>
          <FormInput />
        </div>
        <Footer />
      </Layout>
    </>
  );
}
