"use client"
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import Link from 'next/link';

export default async function Home() {
  const router = useRouter();
  const req = await fetch("http://localhost:3003/alunos", {
    cache: "no-cache"
  });
  const alunos = await req.json();
 

  const remover = async (id) => {
    try {
      await fetch("http://localhost:3003/alunos/" + id, {
        method: "DELETE"
      })
      router.refresh()
    } catch {
      alert.arguments("Não foi possivel remover!")
    } 
  }
  return (
    <main className={styles.main}>

      <Link href="/cadastrar">CADASTRAR</Link>
      {alunos.map(aluno => (
        <div key={aluno.id}><br/>
          <p>{aluno.nome}</p>
          <p>{aluno.curso}</p>
          <p>{aluno.num_inscricao}</p><br/><br/>
          <button onClick={e => e.preventDefault(remover(aluno.id))}>REMOVER</button>
        </div>
      ))}
    </main>
  )
}