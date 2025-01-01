interface Iprops {
  title: string;
  icon?: any
}

const PageHeading = ({ title, icon }: Iprops) => (
  <div className="page-heading">
    <span aria-hidden>
      {icon}
      {' '}
      {title}
    </span>
  </div>
);

PageHeading.defaultProps = {
  icon: null
};

export default PageHeading;
