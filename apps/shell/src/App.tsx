import React, {  Suspense } from 'react';

const Button2 = React.lazy(() => import('test2/TestButton'));
const Button3 = React.lazy(() => import('test2/TestButton2'));

const App = () => {
    return (
      
    <>
      <Suspense fallback="Loading...">
          {/* <Navbar title="" /> */}
          <main className="text-brand-900 flex h-full animate-pulse items-center justify-center p-8 text-center text-8xl font-bold">
            Federated React App
            <div>
              <Button2/>
              <Button3 > fgh</Button3>
            </div>
          </main>

        </Suspense>;
    </>
    )
}
export default App;
