import Head from "next/head";
import {Zen_Antique} from "@next/font/google";

import styles from "./Index.module.scss";

const zenAntique = Zen_Antique({weight: '400', subsets: ['japanese'], display: 'swap'});

export default function Index() {
    return (
        <>
            <Head>
                <title>絶望的な起床</title>
            </Head>

            <main className={zenAntique.className}>
                <p className={styles.title}>絶望的な起床</p>
                <p className={styles.subtitle}>からの二度寝</p>
            </main>
        </>
    )
}
