export default function Loading({ height, width }) {
    return (
        <div style={{ width: width || '650px', height: height || '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <div id="loading"></div>
        </div>
    )
}
