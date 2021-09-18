import styles from './SiteContent.module.css';

const SiteContent = props => {
    return(
        <div className={styles.wrapper}>
            {props.children}
        </div>
    );
}

export default SiteContent;