# Getting Listed on x402 Bazaar

## Overview

Your PDF Parser MCP will automatically appear on **https://x402bazaar.app** after your first paid call settles through the CDP Facilitator. No registration form needed!

## Current Status

✅ **Implementation Complete**: PDF parser with pdf-parse library
✅ **x402 Discovery**: `/.well-known/x402` endpoint ready
✅ **MCP Compatible**: `/mcp/tools` endpoint configured
⏳ **Deployment**: Ready to deploy to Vercel

## How to Get Listed

### Step 1: Deploy to Vercel ✅ IN PROGRESS

Once deployed, validate your endpoint:

```bash
curl -X POST -i https://pdf-parser-mcp.vercel.app/api/parse \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/sample.pdf"}'
```

Should return:
```
HTTP/1.1 402 Payment Required
```

### Step 2: Wait for First Paid Call

Once a user or AI agent completes a paid call through the CDP Facilitator:
1. Payment settles on Base Mainnet
2. CDP automatically catalogs your endpoint
3. Your service appears on x402bazaar.app within minutes

### Step 3: Optional - Manual Testing

You can test with CDP's x402 tooling or wait for organic discovery.

## Discovery Confirmation

After a paid call, check the `EXTENSION-RESPONSES` header in the settle response (base64-encoded JSON):

- `"success"` - Metadata cataloged ✅
- `"processing"` - Being cataloged asynchronously ⏳
- `"rejected"` - Check `rejectedReason` for validation errors ❌

## Requirements for Listing

### Required:
- ✅ Public HTTPS URL
- ✅ Returns `402 Payment Required`
- ✅ Valid x402 discovery endpoint
- ✅ Accepts payments through CDP Facilitator
- ✅ Base/USDC only

### For Featured/Curated Tier:
- Live mainnet payments
- ≥99% availability (30-day window)
- Complete input schemas and examples
- Clear agent-focused description
- Passes platform health probes

## Your Endpoint Details

**Base URL**: `https://pdf-parser-mcp.vercel.app` (to be deployed)
**Method**: `POST`  
**Price**: $0.006 USDC  
**Network**: Base Mainnet (eip155:8453)  
**Payment Address**: `0xf081ee84c0d85278a6242bc265f0b312021ebeb1`

**Primary Endpoints**:
1. `/api/parse` - Parse PDF and extract all text
2. `/api/metadata` - Get PDF metadata only

**Example Request**:
```bash
POST /api/parse
Content-Type: application/json
{ "url": "https://example.com/document.pdf" }
```

**Example Response**:
```json
{
  "success": true,
  "url": "https://example.com/document.pdf",
  "content": {
    "text": "Full extracted text...",
    "pages": 10,
    "info": {
      "Title": "Sample Document",
      "Author": "John Doe"
    }
  },
  "statistics": {
    "totalPages": 10,
    "totalCharacters": 45678,
    "totalWords": 7234
  }
}
```

## Maintenance

To stay listed:
- Complete at least 1 paid call every 30 days
- Maintain ≥99% uptime
- Continue returning 402 for unpaid requests
- Respond to health probes

**Auto-removal happens when**:
- No settlements for 30+ days
- Health probes fail consistently
- Endpoint stops returning 402

## Tracking Your Listing

Once listed, find your endpoint on:
- **Browse**: https://x402bazaar.app
- **Search by tags**: pdf, parser, document, text-extraction, pdf-parse, mcp
- **Your payment address**: Search by `0xf081ee84c0d85278a6242bc265f0b312021ebeb1`

## Use Cases for AI Agents

Your PDF Parser MCP is perfect for:
- **Invoice Processing** - Extract data from invoices and receipts
- **Contract Analysis** - Parse legal contracts and agreements
- **Research Papers** - Extract text from academic PDFs
- **Financial Reports** - Process financial statements and reports
- **Document Archiving** - Convert scanned PDFs to searchable text
- **Data Extraction** - Pull information from forms and documents
- **Content Migration** - Extract PDF content for databases
- **Automated Workflows** - Process PDF attachments automatically

## Metadata Quality

**Description**: 
"PDF parser for AI agents. Extract full text, metadata, and statistics from any PDF document. Get page count, word count, author, title, creation date, and more. Perfect for invoice processing, contract analysis, research paper extraction, and document automation."

**Tags**:
- pdf
- parser
- pdf-parse
- document-processing
- text-extraction
- metadata
- invoices
- contracts
- research
- mcp

## Support

- **x402 Docs**: https://docs.cdp.coinbase.com/x402
- **GitHub**: https://github.com/coinbase/x402
- **Bazaar**: https://x402bazaar.app
- **Live API**: https://pdf-parser-mcp.vercel.app (to be deployed)

## Next Steps

⏳ Deploying to Vercel
⏳ Creating GitHub repository
⏳ Validating all endpoints
⏳ Waiting for first paid call to auto-list on Bazaar

Your MCP is ready for deployment!

---

**Coming soon!** After deployment, your first paid call will automatically list you on x402bazaar.app! 🚀
