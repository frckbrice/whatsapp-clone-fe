import * as React from 'react';

interface IAppProps {
}

const HeaderMainPage: React.FunctionComponent<IAppProps> = (props) => {
  return <header className='bg-[#f0f2f5] py-[10px] px-[16px] border border-spacing-1 border-[#d1d7db] h-[80px] fixed top-0  z-100 box-border flex items-center w-[76.61%]'>Hey am the Main Header</header>;
};

export default HeaderMainPage;
