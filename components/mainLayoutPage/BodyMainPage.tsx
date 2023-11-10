import * as React from 'react';
import Message from './Message';

export interface IAppProps {
}

export function BodyMainPage (props: IAppProps) {
  return (
    <section>
      Hey an the body of the main page
      <Message/>
    </section>
  );
}
