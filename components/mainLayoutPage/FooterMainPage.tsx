import * as React from 'react';

export interface IAppProps {
}

export default function FooterMainPage (props: IAppProps) {
  return (
    <footer className=' px-[16px] border-l-1 border-[#e9edef] py-[5px] bg-[#f0f2f5] fixed bottom-0 z-2 box-border flex item-center w-[76.61%] min-h-[80px]'>
      Hey am the footer of the main page
    </footer>
  );
}
