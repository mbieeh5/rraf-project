import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import { ColorModeScript } from 'nextjs-color-mode';
import React, { PropsWithChildren } from 'react';
import Footer from 'components/Footer';
import { GlobalStyle } from 'components/GlobalStyles';
import Navbar from 'components/Navbar';
import NavigationDrawer from 'components/NavigationDrawer';
import { LoginProvider, useLogin } from 'contexts/LoginContext';
import { NewsletterModalContextProvider } from 'contexts/newsletter-modal.context';
import { NavItems } from 'types';



const navItemsNotLogin: NavItems = [
  { title: 'Tools/Apps', href: '/tools' },
  { title: 'Games', href: '/games' },
  { title: 'Feedback', href: '/feedback' },
  { title: 'News', href: '/news' },
  { title: 'Sign up', href: '/sign-up', outlined: false },
];

const navItemsIsLogin: NavItems = [
  { title: 'Tools/Apps', href: '/tools' },
  { title: 'Games', href: '/games' },
  { title: 'Feedback', href: '/feedback' },
  { title: 'Blog', href: '/blog' },
  { title: 'News', href: '/news' },
  { title: 'Profile', href: '/profile' },
];




function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <LoginProvider>
        <ColorModeScript />
        <GlobalStyle />
        <MyAppContents Component={Component} pageProps={pageProps} />
      </LoginProvider>
    </>
  );
}

function MyAppContents({Component, pageProps}:{Component: React.ComponentType; pageProps: any}) {
const {isLogin} = useLogin();


  return(
    <Providers isLogin={isLogin}>
      <Navbar items={ isLogin? navItemsIsLogin : navItemsNotLogin}/>
      <Component {...pageProps}/>
      <Footer />
    </Providers>
  )
}

function Providers<T>({ children }: PropsWithChildren<T>) {
const {isLogin} = useLogin();
  return (
    <NewsletterModalContextProvider>
      <NavigationDrawer items={ isLogin? navItemsIsLogin : navItemsNotLogin}>{children}</NavigationDrawer>
    </NewsletterModalContextProvider>
  );
}


export default MyApp;
