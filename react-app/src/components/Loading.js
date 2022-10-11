export default function Loading({ height, width }) {
    return (
        <div style={{ boxSizing: 'border-box', width: width || '650px', height: height || '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <div id="loading"></div>
        </div>
    )
}
