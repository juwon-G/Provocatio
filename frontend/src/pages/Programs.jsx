import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { programsAPI } from '../services/api';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async (searchQuery = '') => {
    try {
      setLoading(true);
      const params = searchQuery ? { search: searchQuery } : {};
      const response = await programsAPI.getAll(params);
      setPrograms(response.data);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPrograms(search);
  };

  if (loading) {
    return <div style={styles.loading}>로딩 중...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>프로그램 목록</h1>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="프로그램 검색..."
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>검색</button>
        </form>
      </div>

      {programs.length === 0 ? (
        <p style={styles.empty}>등록된 프로그램이 없습니다.</p>
      ) : (
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
                {program.price && (
                  <p style={styles.price}>{program.price}</p>
                )}
                <div style={styles.cardTags}>
                  {program.tags?.map((tag) => (
                    <span key={tag.id} style={styles.tag}>{tag.name}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
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
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  searchForm: {
    display: 'flex',
    gap: '1rem',
    maxWidth: '500px',
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  searchButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem',
    color: '#7f8c8d',
    fontSize: '1.1rem',
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
  price: {
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

export default Programs;
