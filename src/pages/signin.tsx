import Image from 'next/image';
import Link from 'next/link';

import { AnchorLink, Button, Input } from '~/components';

import styles from '~/styles/pages/signin.module.scss';

function SignIn(): JSX.Element {
  return (
    <section className={styles.SignIn}>
      <section className={styles.SignInContent}>
        <Image
          src="/assets/icons/iphoto-logo-black.svg"
          alt="SignIn"
          width={212}
          height={58}
          layout="fixed"
        />
        <h1 className={styles.SignInTitle}>Sign in with your account</h1>
        <form className={styles.SignInForm}>
          <Input name="email" label="E-mail" placeholder="name@example.com" />
          <Input type="password" name="password" label="Senha" />
          <Button type="submit" style={{ maxWidth: '100%' }}>
            Sign in
          </Button>
          <span className={styles.SignInFormOr}>or</span>
          <Link href="/signup" passHref>
            <AnchorLink className={styles.SignUpLink}>
              Create a new account
            </AnchorLink>
          </Link>
        </form>
      </section>
    </section>
  );
}

export default SignIn;
