import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import Nav from '../components/nav/nav';
import Footer from '../components/footer/footer';

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <Nav />
        <section>
          <Slot />
        </section>
      </main>
      <Footer />
    </>
  );
});
