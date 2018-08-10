import React from 'react';
import React3 from 'react-three-renderer';
import PropsTypes from 'prop-types'
import * as THREE from 'three';

class Simple extends React.Component {
    static propTypes = {
        width: PropsTypes.number,
        height: PropsTypes.number,
    };
    static defaultProps = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    cameraPosition = new THREE.Vector3(0, 0, 1000);
    state = {
        cubeRotation: new THREE.Euler(),
    };

    modelRefs = {
        scene: null
    };
    /**
     * 获取ref实例
     * @param key
     * @param tar
     */
    getTefTarget = (key, tar) => {
        this.modelRefs[key] = tar;
    };

    _onAnimate = () => {
        this.setState({
            cubeRotation: new THREE.Euler(
                this.state.cubeRotation.x + 0.1,
                this.state.cubeRotation.y + 0.1,
            ),
        });
    };
    renderLoginBox = () => {
        return (
            <mesh
                // position={}
            >
                <boxGeometry
                    width={500}
                    height={328}
                    depth={200}
                />
                <meshBasicMaterial
                    color={0xffffff}
                    wireframe={true}
                />
            </mesh>
        )
    };
    getArcTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = '#080808';
        ctx.arc(0, 0, 50, 0, Math.PI * 2);
        ctx.fill();
        return canvas;
    };
    /**
     * 底部小点
     */
    renderBottomSprite = () => {
        const separation = 150;
        const amountx = 5;
        const amounty = 5;
        const texture = new THREE.Texture(this.getArcTexture());
        texture.needsUpdate = true;
        const spriteEle = [];

        for (let ix = 0; ix < amountx; ix++) {
            for (let iy = 0; ix < amounty; iy++) {
                const x = ix * separation - ((amountx * separation) / 2);
                const y = -153;
                const z = iy * separation - ((amounty * separation / 2));
                const position = new THREE.Vector3(x, y, z);
                const scale = new THREE.Vector3(2, 2, 2);

                const sprite = (
                    <sprite
                        scale={scale}
                        position={position}
                    >
                        <spriteMaterial
                            map={texture}
                        />
                    </sprite>
                );
                spriteEle.push(sprite)
            }
        }
        return spriteEle;
    };
    createShapePoints = () => {
        //创建一个圆形的材质，记得一定要加上texture.needsUpdate = true;
        let canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        let context = canvas.getContext("2d");
        context.fillStyle = "#ffff00";
        context.arc(50, 50, 45, 0, 2 * Math.PI);
        ;
        context.fill();
        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        //创建点，是用PointsMaterial的map属性来设置材质
        let geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(15, 15, 0));
        geometry.vertices.push(new THREE.Vector3(-15, 2, 0));
        let material = new THREE.PointsMaterial({color: 0xff0000, size: 4, map: texture});
        let points = new THREE.Points(geometry, material);
        return (
            <sprite
                name={'bottomSprite'}

            />
        );
    };

    render() {
        const {width, height} = this.props;
        return (
            <React3
                mainCamera="camera" // this points to the perspectiveCamera below
                width={width}
                height={height}
                antialias
                onAnimate={this._onAnimate}
            >
                <scene
                    // ref={this.getTefTarget.bind(null,"scene")}
                    color={0xf0f0f0}
                >
                    <perspectiveCamera
                        name="camera"
                        fov={75}
                        aspect={width / height}
                        near={1}
                        far={10000}
                        position={this.cameraPosition}
                    />
                    {/*<canvas />*/}
                    {/*{this.renderBottomSprite()}*/}
                </scene>
            </React3>);
    }
}

export default Simple;
