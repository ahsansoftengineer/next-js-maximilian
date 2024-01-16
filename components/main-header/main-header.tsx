import Link from 'next/link';
import classes from './main-header.module.css';

import logoImg from '@/assets/logo.png';
import Image from 'next/image';
import MainHeaderBG from './main-header-bg';
import NavLink from './nav-link';
export default function MainHeader() {
  return (
    <>
      <MainHeaderBG />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image
            className={classes.logo}
            src={logoImg}
            alt="A plate with food on it"
          />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
             <NavLink href='/meals'>
                Browse Meal
              </NavLink>
            </li>
            <li>
              <NavLink href='/community'>
                Foodies Community
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
