import { Col, Row } from 'antd';
import React from 'react';
import { HeadCard } from '../card/head-card';
import { FooterCard } from '../card/footer-card';
interface Props {
    Photo: any;
    children: any;
}

export function CardContent({ Photo, children }: Props){
    const styles = {
        card: {
            border: 2, borderStyle: 'solid', width: '100%', borderColor: '#cdcdcd', padding: 5, marginBottom: 50
        }
    }

    return(
        <>
            <div style={styles.card}>
                <HeadCard Photo={Photo} />
                <Row justify='center'>
                    <Col span={24}>
                        {children}
                    </Col>
                </Row>
                <FooterCard Photo={Photo} />
            </div>
        </>
    );
}
