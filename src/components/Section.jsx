const Section = ({ id, number, title, children, className = '', ...props }) => {
  return (
    <section id={id} className={`content-section ${className}`} {...props}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">{number}</span>
          <h2 className="section-title">&lt;{title} /&gt;</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

export default Section
