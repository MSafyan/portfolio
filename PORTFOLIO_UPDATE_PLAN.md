# Portfolio Update Plan - Safyan Akram

## Summary of Changes

### Projects to KEEP (4 Shared Projects):
1. ✅ **Fashion Xotics** (Web) - id: 5
2. ✅ **Chez Chef** (Web) - id: 3
3. ✅ **Wand Cleaning** (Web) - id: 4
4. ✅ **Res Ihop Mobile App** (Mobile) - id: 98

### Projects to REMOVE (All Muzammil-specific mobile apps):
- ❌ Fawkes Games
- ❌ Portfolio (3D)
- ❌ Tech Access
- ❌ Alpha Health Care
- ❌ Pashma Khan
- ❌ Pride and ego
- ❌ Helpicon Mobile App (will replace with backend-focused version)
- ❌ Superhero eSIM
- ❌ Ilaaqa Real Estate
- ❌ Rescue 1122
- ❌ Climate IQ
- ❌ Azure Cloak VPN
- ❌ Hanti App
- ❌ DHA Consumer/Driver/Attendance Apps
- ❌ TingMe & Ting Hotspot
- ❌ PakQue Kids App
- ❌ Royal Food App
- ❌ Vendors Online
- ❌ Bet App (design)
- ❌ Fashion Xotics Mobile (duplicate - keeping web version)
- ❌ Kids Que (design)

### NEW Projects to ADD (Safyan's Actual Work):

#### **Website/Backend Projects:**
1. **Helpicon Backend & DevOps** - Backend microservices + AWS infrastructure
2. **Abundance Movement** - AI/ML platform (OpenAI, LangChain, Pinecone)
3. **CVR Sports Analytics** - Rugby league platform
4. **Palmetto Air Balance** - Azure data warehouse
5. **Pink Chicken** - Retail data integration
6. **CHAINSCAN (Frizhub)** - NFT Explorer/Blockchain
7. **P2G Global Services** - E-commerce operations
8. **Facebook Group Scraper** - Automation tool

#### **Mobile Projects:**
9. **Employee & Resource Management** - React Native business app

---

## Final Project Count

**Before:** 30+ projects (mostly mobile)
**After:** ~13 projects (balanced backend/data/web/mobile)

**New Distribution:**
- Website/Backend: 8 projects
- Mobile: 5 projects (Res Ihop, Fashion Xotics, Helpicon mobile mention, Employee Management, + 1 more if needed)

---

## Technology Tags Update Needed

### Remove/Reduce:
- Flutter-specific projects (keeping only shared ones)
- Mobile-heavy Firebase implementations
- WordPress/Shopify (unless specifically worked on)

### Add/Emphasize:
- **Node.js**, **NestJS**, **TypeScript** (backend focus)
- **AWS**, **Azure**, **Terraform** (cloud/DevOps)
- **OpenAI**, **AI/ML**, **Pinecone** (AI projects)
- **PostgreSQL**, **MongoDB**, **Data Engineering**
- **Playwright**, **Automation**
- **React**, **Next.js**, **Angular** (web/full-stack)

---

## Other Sections to Update

### 1. **resumeData.title**
- Current: "Mobile Application Developer"
- **New:** "Full-Stack & Cloud Engineer" or "Backend Developer & Data Engineer"

### 2. **resumeData.summary**
- Current: Mobile app developer focused summary
- **New:** Backend, data engineering, AI/ML, cloud architecture focus

### 3. **resumeData.skills**
Update to reflect:
- Backend: Node.js, NestJS, Express, TypeScript
- Cloud: AWS (certified), Azure, Terraform
- Data: PostgreSQL, MongoDB, ETL/ELT, Data Factory
- AI/ML: OpenAI, LangChain, Pinecone
- Frontend: React, Next.js, Angular (supporting)

### 4. **experiences**
- **Current:** Mobile-focused roles (Helpicon mobile, Green Origin mobile apps, etc.)
- **Update to:**
  - Abundance Movement (Full-Stack + AI, April 2023 - Present)
  - Helpicon (Backend Developer, Sept 2023 - Present)
  - Frizhub (Full-Stack, Nov 2022 - Aug 2023)
  - P2G Global Services (Contract, Nov 2020 - 2023)

### 5. **services** (About section cards)
- Current: "React Native Developer", "Flutter Developer", "Web Developer", "UI/UX Designer"
- **New:**
  - "Backend Developer"
  - "Cloud Engineer"
  - "Data Engineer"
  - "Full-Stack Developer"

### 6. **technologies** (Tech stack icons)
Keep: JavaScript, React, Redux, Git, HTML, CSS, Tailwind, Figma
**Add icons for:**
- Node.js logo
- AWS logo
- Azure logo
- PostgreSQL logo
- MongoDB logo
- TypeScript logo
- Docker logo (if available)
- Terraform logo (if available)

Remove/Reduce: Dart, Flutter (unless keeping some mobile work)

### 7. **certifications**
- ✅ Keep AWS Solutions Architect (both Credly + Udemy)
- **ADD:** HashiCorp Terraform Associate certification
- Keep Meta front/backend certs

---

## Implementation Steps

1. ✅ Backup original `constants/index.js`
2. Update `projects` array (remove Muzammil-specific, add Safyan's)
3. Update `resumeData` (title, summary, skills, experience)
4. Update `services` array
5. Update `technologies` array (add backend/cloud icons)
6. Add Terraform certification to `certifications`
7. Update `About.jsx` description if needed
8. Test portfolio locally (`yarn dev`)
9. Review all changes
10. Commit changes

---

## Important Notes

### Image Assets Needed:
For new projects, you'll need to:
1. Take screenshots of actual project dashboards/UIs
2. Create placeholder images temporarily
3. For data projects: consider architecture diagrams, dashboard screenshots
4. For backend projects: API documentation, system architecture, monitoring dashboards

### GitHub Repository Links:
- Most backend/data projects may not have public repos
- Consider creating sanitized/demo versions for portfolio
- Use "#" placeholder for now, update later with actual links

### Project Descriptions:
- Emphasize technical challenges solved
- Include quantifiable results (99.9% cost reduction, $40M portfolio, etc.)
- Highlight technologies and architecture decisions
- Focus on backend/data/cloud aspects over UI/mobile

---

## Risk Mitigation

**Backup Strategy:**
- Original file backed up as `index.js.backup`
- Can revert anytime with: `cp index.js.backup index.js`

**Testing:**
- Run `yarn dev` after each major change
- Check all project cards render correctly
- Verify filtering (website/mobile/design) still works
- Test modal views for projects with images[]

---

## Next Steps After Portfolio Update

1. **Gather Project Screenshots**
   - Abundance Movement (AI dashboard, cost metrics)
   - Palmetto/Pink Chicken (data pipelines, PowerBI dashboards)
   - CVR Sports (analytics charts)
   - Helpicon (AWS architecture, monitoring)

2. **Create GitHub Repositories**
   - Generic templates for data pipelines
   - Terraform AWS/Azure examples
   - Automation scripts (sanitized)

3. **Write Blog Posts** (optional)
   - "How I Reduced AI Costs by 99.9%"
   - "Building Enterprise Data Warehouses on Azure"
   - "DevOps on AWS with Terraform and Kubernetes"

4. **Update LinkedIn/Resume**
   - Sync with new portfolio content
   - Emphasize backend/data/cloud work
   - Add project links

---

**Ready to proceed with implementation?**
