'use client';

import React from 'react'
import FeedIcon from '@/icons/feed-icon'
import EstatisticasIcon from '@/icons/estatisticas-icon'
import AdicionarIcon from '@/icons/adicionar-icon'
import SairIcon from '@/icons/sair-icon'
import useMedia from '@/hooks/use-media'
import styles from './conta-header.module.css'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import logout from '@/actions/logout';
import { useUser } from '@/context/user-context';


function getTitle(pathname: string) {
  switch(pathname) {
    case '/conta/postar':
      return 'Poste Sua Foto';
    case '/conta/estatisticas':
      return 'Estatísticas';
    default:
      return 'Minha Conta';
  }

}

export default function ContaHeader() {

  const pathName  = usePathname();

  React.useEffect(() => {
    setMobileMenu(false);
  },[pathName])

  const{setUser} = useUser();

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  return (
    <header className={styles.header}>
    <h1 className='title'>{getTitle(pathName)}</h1>
    {mobile && (
      <button 
        aria-label='Menu' 
        className={`${styles.mobileButton} ${
          mobileMenu && styles.mobileButtonActive}`}
        onClick={() => setMobileMenu(!mobileMenu)} 
        ></button>
    )}

    <nav className={`${mobile ? styles.navMobile : styles.nav} ${
      mobileMenu && styles.navMobileActive}`}>
      <Link href='/conta' className={pathName === '/conta' ? 'active' : ''}>
        <FeedIcon/>
        {mobile && 'Minhas Fotos'}
      </Link>
      <Link href='/conta/estatisticas' className={pathName === '/conta/estatisticas' ? 'active' : ''}>
        <EstatisticasIcon/>
        {mobile && 'Estatísticas'}
      </Link>
      <Link href='/conta/postar' className={pathName === '/conta/postar' ? 'active' : ''}>
        <AdicionarIcon/>
        {mobile && 'Adicionar Foto'}
      </Link>
      <button onClick={handleLogout}><SairIcon/>{mobile &&'Sair'}</button>
    </nav>
    </header>
  )
}
