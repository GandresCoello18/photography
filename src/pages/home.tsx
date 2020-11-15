import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { unsplash, json } from '../api/unsplash';
import { Layout } from '../component/layout';
import { CardPhoto } from '../component/photo/card';
import { SvgLogo } from '../component/svg/logo';

export function HomePage(){
    const [getPhoto, setPhoto] = useState<Array<any>>([]);

    useEffect( () => {
        unsplash.photos.listPhotos(1, 15, "latest")
            .then(json)
            .then(data => {
                console.log(data);
                setPhoto(data);
            });
    },[]);

    return(
        <>
            <Layout TitleHead='Home'>
                <SvgLogo />
                <Row justify='center'>
                    {getPhoto.map(photo => (
                        <Col span={22} style={{ marginBottom: 10 }}>
                            <CardPhoto Photo={photo} />
                        </Col>
                    ))}
                </Row>
            </Layout>
        </>
    );
}
