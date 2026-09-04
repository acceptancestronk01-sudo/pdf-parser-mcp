# PDF Parser MCP

**x402 Payment-Protected PDF Parsing & Text Extraction API**

Parse and extract text from PDF documents for AI agents doing document analysis, data extraction, and content processing.

## 🚀 Features

- **📝 Full Text Extraction** - Extract all text content from any PDF
- **📊 Document Metadata** - Get author, title, creation date, page count
- **📖 Page Analysis** - Total pages, word count, character count
- **🔍 Document Info** - Creator, producer, PDF version, dates
- **📄 Multi-Page Support** - Handle documents of any length
- **💳 x402 Micropayments** - Pay $0.006 USDC per document on Base Mainnet
- **🤖 MCP Compatible** - Works with Claude and other AI agents

## 📡 Live Endpoint

**Base URL**: `https://pdf-parser-mcp.vercel.app` (will be updated after deployment)

### Parse PDF

```bash
POST /api/parse
Content-Type: application/json
```

**Body:**
```json
{
  "url": "https://example.com/document.pdf"
}
```

**Example:**
```bash
curl -X POST https://pdf-parser-mcp.vercel.app/api/parse \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/document.pdf"}'
```

### Get PDF Metadata

```bash
POST /api/metadata
Content-Type: application/json
```

**Body:**
```json
{
  "url": "https://example.com/document.pdf"
}
```

**Example:**
```bash
curl -X POST https://pdf-parser-mcp.vercel.app/api/metadata \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/document.pdf"}'
```

**Response (402 Payment Required):**
```json
{
  "error": "Payment Required",
  "message": "This endpoint requires x402 payment",
  "payment": {
    "scheme": "exact",
    "network": "eip155:8453",
    "price": "$0.006",
    "currency": "USDC",
    "payTo": "0xf081ee84c0d85278a6242bc265f0b312021ebeb1"
  },
  "instructions": "Include payment proof in X-Payment-Proof header"
}
```

## 🔍 Discovery Endpoints

- **Bazaar Discovery**: `/.well-known/x402`
- **MCP Metadata**: `/mcp/tools`
- **Health Check**: `/health`

## 💰 Payment Details

- **Network**: Base Mainnet (Chain ID: eip155:8453)
- **Currency**: USDC
- **Price**: $0.006 per document
- **Protocol**: x402 "exact" scheme
- **Payment Address**: `0xf081ee84c0d85278a6242bc265f0b312021ebeb1`

## 🤖 Use with AI Agents

This MCP server is designed to work with Claude Code and other AI agents that support the Model Context Protocol (MCP) and x402 payments.

AI agents can:
1. Discover the service on x402 Bazaar
2. Pay via CDP Facilitator
3. Parse PDF documents from URLs
4. Extract full text content
5. Get document metadata
6. Analyze document statistics
7. Process invoices, contracts, reports, research papers

## 📦 Response Format

### Parse Response
```json
{
  "success": true,
  "url": "https://example.com/document.pdf",
  "content": {
    "text": "Full extracted text content from the PDF...",
    "pages": 10,
    "info": {
      "Title": "Sample Document",
      "Author": "John Doe",
      "Subject": "Technical Documentation",
      "Creator": "Microsoft Word",
      "Producer": "Adobe PDF Library",
      "CreationDate": "D:20260904120000",
      "ModDate": "D:20260904150000"
    },
    "metadata": {},
    "version": "1.7"
  },
  "statistics": {
    "totalPages": 10,
    "totalCharacters": 45678,
    "totalWords": 7234,
    "totalLines": 892
  },
  "parsedAt": "2026-09-04T20:15:00.000Z",
  "payment": {
    "verified": true,
    "amount": "0.006",
    "currency": "USDC"
  }
}
```

### Metadata Response
```json
{
  "success": true,
  "url": "https://example.com/document.pdf",
  "metadata": {
    "pages": 10,
    "info": {
      "Title": "Sample Document",
      "Author": "John Doe",
      "Subject": "Technical Documentation"
    },
    "metadata": {},
    "version": "1.7",
    "title": "Sample Document",
    "author": "John Doe",
    "subject": "Technical Documentation",
    "creator": "Microsoft Word",
    "producer": "Adobe PDF Library",
    "creationDate": "D:20260904120000",
    "modificationDate": "D:20260904150000"
  },
  "statistics": {
    "totalPages": 10,
    "estimatedSize": 524288,
    "formatVersion": "1.7"
  },
  "extractedAt": "2026-09-04T20:15:00.000Z"
}
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Run locally
npm start

# Development mode with auto-reload
npm run dev
```

Server will start on `http://localhost:3000`

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

The `vercel.json` configuration is already set up for Express.

## 📊 Use Cases

### Business & Finance
- **Invoice Processing** - Extract data from invoices and receipts
- **Contract Analysis** - Parse legal contracts and agreements
- **Financial Reports** - Extract data from financial statements
- **Tax Documents** - Process tax forms and documents

### Research & Education
- **Research Papers** - Extract text from academic PDFs
- **Study Materials** - Parse textbooks and study guides
- **Thesis Analysis** - Extract content from dissertations
- **Literature Review** - Process multiple research documents

### Document Management
- **Archive Digitization** - Convert scanned PDFs to text
- **Content Migration** - Extract content for database import
- **Document Search** - Enable full-text search on PDFs
- **Data Extraction** - Pull specific information from forms

### Automation
- **Workflow Integration** - Automate document processing
- **Report Generation** - Extract data for automated reports
- **Email Processing** - Parse PDF attachments automatically
- **Data Analytics** - Extract PDF data for analysis

## ⚠️ Important Notes

### Limitations
- PDF must be publicly accessible via URL
- Maximum file size: 50MB
- Timeout: 30 seconds per request
- Text-based PDFs only (scanned images require OCR)
- Does not extract tables, images, or formatting

### Best Practices
- Use direct PDF URLs (not HTML pages)
- Ensure PDFs are not password-protected
- Verify PDF is text-based before parsing
- Cache results to avoid re-parsing same documents

### PDF Requirements
- ✅ Text-based PDFs
- ✅ Publicly accessible URLs
- ✅ Standard PDF formats (1.0-2.0)
- ✅ Unencrypted documents
- ❌ Scanned images (no OCR)
- ❌ Password-protected PDFs
- ❌ Corrupted or invalid PDFs

## 🔗 Integration Example

### With Claude Code

```javascript
// AI agent automatically handles x402 payment
const response = await fetch('https://pdf-parser-mcp.vercel.app/api/parse', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Payment-Proof': '<payment_proof>'
  },
  body: JSON.stringify({
    url: 'https://example.com/document.pdf'
  })
});

const data = await response.json();
console.log(`Extracted ${data.statistics.totalWords} words from ${data.content.pages} pages`);
```

### MCP Tool Schema

```json
{
  "name": "parse_pdf",
  "description": "Parse PDF document and extract all text content and metadata",
  "inputSchema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "URL of the PDF document to parse",
        "format": "uri"
      }
    },
    "required": ["url"]
  }
}
```

## 🎯 What Gets Extracted

### Text Content
- All readable text from all pages
- Preserves paragraph breaks
- Maintains line structure
- Includes headers and footers

### Metadata
- **Title** - Document title
- **Author** - Document author
- **Subject** - Document subject/description
- **Creator** - Application that created the PDF
- **Producer** - PDF processor used
- **Creation Date** - When PDF was created
- **Modification Date** - Last modification date
- **PDF Version** - PDF format version

### Statistics
- **Total Pages** - Number of pages
- **Total Characters** - Character count
- **Total Words** - Word count
- **Total Lines** - Line count
- **File Size** - Document size in bytes

## 🔐 Security

- All payments via x402 protocol on Base Mainnet
- No document storage (processed and discarded)
- No user data stored
- Payment verification on every request
- Rate limiting and validation built-in
- 50MB file size limit
- 30 second timeout per request

## 📝 License

MIT

## 🔗 Links

- **Live API**: https://pdf-parser-mcp.vercel.app (will be updated)
- **x402 Bazaar**: https://x402bazaar.app
- **MCP Protocol**: https://modelcontextprotocol.io
- **Base Network**: https://base.org
- **GitHub**: https://github.com/acceptancestronk01-sudo/pdf-parser-mcp

---

Built with ❤️ for the AI agent ecosystem
