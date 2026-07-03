const appDb = db.getSiblingDB('innolab_dev');

const now = new Date();
const placeholderBase = 'https://placehold.co/900x540/1f2937/f9fafb/png';

appDb.projects.update(
  { title: 'Connectome Explorer' },
  {
    $set: {
      title: 'Connectome Explorer',
      create_date: now,
      short_desc: 'Interactive exploration of networked data and visual analysis workflows.',
      desc: 'Portfolio-safe demo project entry. The original database dump and copyrighted media are not included in this repository.',
      image: placeholderBase + '?text=Connectome+Explorer',
      createdAt: now,
      updatedAt: now
    }
  },
  { upsert: true }
);

appDb.projects.update(
  { title: 'ADeA Analytics' },
  {
    $set: {
      title: 'ADeA Analytics',
      create_date: now,
      short_desc: 'Data-driven dashboard concept for applied analytics and exploration.',
      desc: 'Portfolio-safe demo project entry using neutral placeholder imagery.',
      image: placeholderBase + '?text=ADeA+Analytics',
      createdAt: now,
      updatedAt: now
    }
  },
  { upsert: true }
);

appDb.projects.update(
  { title: 'Sustainability Data View' },
  {
    $set: {
      title: 'Sustainability Data View',
      create_date: now,
      short_desc: 'Sustainability-focused visualization concept for data-rich content.',
      desc: 'Portfolio-safe demo project entry using neutral placeholder imagery.',
      image: placeholderBase + '?text=Sustainability+Data+View',
      createdAt: now,
      updatedAt: now
    }
  },
  { upsert: true }
);

appDb.projects.update(
  { title: 'Mobility Visualization' },
  {
    $set: {
      title: 'Mobility Visualization',
      create_date: now,
      short_desc: 'Mobility and geospatial data exploration demo entry.',
      desc: 'Portfolio-safe demo project entry using neutral placeholder imagery.',
      image: placeholderBase + '?text=Mobility+Visualization',
      createdAt: now,
      updatedAt: now
    }
  },
  { upsert: true }
);

appDb.views.update(
  { key: 'dbs_view' },
  {
    $set: {
      key: 'dbs_view',
      label: 'InnoLab Demo Projects',
      items: [
        {
          componentView: {
            key: 'projects_grid',
            title: 'Demo Projects'
          },
          dataModel: {
            key: 'projects',
            filter: {}
          }
        }
      ],
      createdAt: now,
      updatedAt: now
    }
  },
  { upsert: true }
);

print('Inserted InnoLab demo data with neutral placeholder image references.');
