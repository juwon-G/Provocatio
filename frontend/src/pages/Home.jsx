import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { programsAPI, requestsAPI } from '../services/api';

const Home = () => {
  const [programs, setPrograms] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [programsRes, requestsRes] = await Promise.all([
        programsAPI.getAll({ limit: 6 }),
        requestsAPI.getAll({ limit: 6 }),
      ]);
      setPrograms(programsRes.data);
      setRequests(requestsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.loading}>로딩 중...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>코드를 만들고, 배우고, 거래하는 플랫폼</h1>
        <p style={styles.heroSubtitle}>
          개발자와 의뢰자를 연결하는 한국형 통합 플랫폼 Provocatio
        </p>
        <div style={styles.heroButtons}>
          <Link to="/programs" style={styles.primaryButton}>프로그램 탐색</Link>
          <Link to="/requests" style={styles.secondaryButton}>의뢰 보기</Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>💻</div>
          <h3 style={styles.featureTitle}>프로그램 등록</h3>
          <p style={styles.featureDesc}>당신의 프로젝트를 공유하고 판매하세요</p>
        </div>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>📋</div>
          <h3 style={styles.featureTitle}>의뢰 등록</h3>
          <p style={styles.featureDesc}>필요한 프로그램을 개발자에게 의뢰하세요</p>
        </div>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>🤝</div>
          <h3 style={styles.featureTitle}>매칭 & 협업</h3>
          <p style={styles.featureDesc}>태그 기반으로 최적의 파트너를 찾으세요</p>
        </div>
      </section>

      {/* Recent Programs */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>최신 프로그램</h2>
          <Link to="/programs" style={styles.viewAll}>전체 보기 →</Link>
        </div>
        <div style={styles.grid}>
          {programs.map((program) => (
            <Link 
              key={program.id} 
              to={`/programs/${program.id}`} 
              style={styles.card}
            >
              <div style={styles.cardImage}>
                {program.image_url ? (
                  <img src={program.image_url} alt={program.title} style={styles.image} />
                ) : (
                  <div style={styles.placeholderImage}>📦</div>
                )}
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{program.title}</h3>
                <p style={styles.cardDesc}>
                  {program.description.substring(0, 100)}
                  {program.description.length > 100 ? '...' : ''}
                </p>
                <div style={styles.cardTags}>
                  {program.tags?.slice(0, 3).map((tag) => (
                    <span key={tag.id} style={styles.tag}>{tag.name}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Requests */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>최신 의뢰</h2>
          <Link to="/requests" style={styles.viewAll}>전체 보기 →</Link>
        </div>
        <div style={styles.grid}>
          {requests.map((request) => (
            <Link 
              key={request.id} 
              to={`/requests/${request.id}`} 
              style={styles.card}
            >
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{request.title}</h3>
                <p style={styles.cardDesc}>
                  {request.description.substring(0, 100)}
                  {request.description.length > 100 ? '...' : ''}
                </p>
                {request.budget && (
                  <p style={styles.budget}>예산: {request.budget}</p>
                )}
                <div style={styles.cardTags}>
                  {request.tags?.slice(0, 3).map((tag) => (
                    <span key={tag.id} style={styles.tag}>{tag.name}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '4rem',
    fontSize: '1.2rem',
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    color: '#fff',
    marginBottom: '3rem',
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#fff',
    color: '#667eea',
    padding: '0.75rem 2rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'transform 0.2s',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff',
    padding: '0.75rem 2rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'transform 0.2s',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
  },
  feature: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  },
  featureDesc: {
    color: '#7f8c8d',
  },
  section: {
    marginBottom: '3rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#2c3e50',
  },
  viewAll: {
    color: '#3498db',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textDecoration: 'none',
    color: 'inherit',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  },
  cardImage: {
    height: '180px',
    backgroundColor: '#ecf0f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeholderImage: {
    fontSize: '4rem',
  },
  cardContent: {
    padding: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  cardDesc: {
    color: '#7f8c8d',
    marginBottom: '1rem',
    lineHeight: '1.5',
  },
  budget: {
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  cardTags: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e8f4f8',
    color: '#3498db',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
  },
};

export default Home;
