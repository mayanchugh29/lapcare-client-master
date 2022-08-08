import { Container, Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const Catalogue = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('https://lapcare.sgp1.digitaloceanspaces.com/downloads/downloads/New%20Lapcare%20Catalogue%20NEW.pdf')
    }, [])

    return (
        <Container style={{ display: "flex", flexFlow: "column nowrap", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <Typography variant="h4" align="center">Your File is getting downloaded !</Typography>
            <br />
            <Typography variant="h6" align="center">Please check your Downloads</Typography>
        </Container>
    )
}

export default Catalogue
