export default function CV() {
  return (
    <>
      <div className='w-full h-full absolute z-0'>
        <div className='bg img'></div>
        <div className='clouds img'></div>
        <div className='clouds-front img'></div>
        <div className='beach img'></div>
        <div className='char img'></div>
      </div>
      <div className='p-4'>
        <div className='bg-pink-200 p-9 relative z-10 w-max rounded max-w-xs md:max-w-lg'>
          <h1 className='text-2xl mb-2'>Hi! My name is Jenaro</h1>

          <p className='text-sm mb-2'>
            I&apos;m a fullstack developer, you can download my CV from this{' '}
            <a className='pointer underline' href='/assets/JenaroCalvino.pdf' download>
              link
            </a>
          </p>

          <p className='text-sm'>I made this website with NextJS, THREE and Godot for the game</p>
          <p className='text-xs mb-2 mt-10'>Here are some of my links:</p>
          <ul className='flex gap-4'>
            <li>
              <a href='https://x.com/JenaroC'>
                <svg
                  className='w-6 h-6 text-black'
                  viewBox='0 0 1200 1227'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'
                    fill='currentColor'
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href='https://github.com/cjenaro'>
                <svg viewBox='0 0 98 96' className='w-6 h-6 text-black' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'
                    fill='currentColor'
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href='https://linkedin.com/in/jenaro-calviño'>
                <img className='w-7 h-7 object-contain' src='/LI-In-Bug.png' alt='LinkedIn.' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
