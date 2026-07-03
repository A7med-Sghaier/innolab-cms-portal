const appDb = db.getSiblingDB('innolab_dev');

const now = new Date();

appDb.projects.update(
  { title: 'Connectome Explorer' },
  {
    $set: {
      title: 'Connectome Explorer',
      create_date: now,
      short_desc: 'Interactive exploration of networked data and visual analysis workflows.',
      desc: 'Portfolio-safe demo project entry based on public InnoLab website imagery. The original database dump is not included in this repository.',
      image: 'https://innolab.ifi.lmu.de/images/semesters/teaser_connectome_2.png',
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
      desc: 'Portfolio-safe demo project entry using a remote image reference from the public live site.',
      image: 'https://innolab.ifi.lmu.de/images/semesters/teaser_adea.png',
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
      desc: 'Portfolio-safe demo project entry using a remote image reference from the public live site.',
      image: 'https://innolab.ifi.lmu.de/images/semesters/sustainability_2.png',
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
      desc: 'Portfolio-safe demo project entry using a remote image reference from the public live site.',
      image: 'https://innolab.ifi.lmu.de/images/semesters/mobility.png',
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

print('Inserted InnoLab demo data with remote live-site image references.');
