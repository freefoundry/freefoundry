// CREATE TABLE raw_opportunities (
//   id UUID PRIMARY KEY,

//   source_name TEXT,
//   source_url TEXT,
//   source_type TEXT, -- rss | api | scrape

//   title TEXT,
//   description TEXT,
//   url TEXT,

//   opportunity_type TEXT, 
//   -- scholarship | job | course | resource

//   raw_content TEXT,

//   extracted_data JSONB,

//   status TEXT DEFAULT 'pending',
//   -- pending | approved | generated | rejected

//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP
// );