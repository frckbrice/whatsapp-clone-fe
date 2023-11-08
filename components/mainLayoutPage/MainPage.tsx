import * as React from 'react';
import FooterMainPage from './FooterMainPage';
import {  BodyMainPage } from './BodyMainPage';
import HeaderMainPage from './HeaderPage';

export interface IAppProps {
}

export default function MainPage (props: IAppProps) {
  return (
    <main className="w-[80%] h-[100vh] bg-whatsappimg flex flex-col">
      <HeaderMainPage/>
      <BodyMainPage/>
      <FooterMainPage/>
    </main>
  );
}
