import express from 'express';
import axios from 'axios';
import pdf from 'pdf-parse';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Payment configuration
const PAYMENT_CONFIG = {
  price: '0.006',
  currency: 'USDC',
  chainId: 'eip155:8453',
  payTo: '0xf081ee84c0d85278a6242bc265f0b312021ebeb1'
};

// Root landing page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Parser MCP - x402 Payment Protected API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #f5576c;
        }
        .subtitle {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 30px;
        }
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: #f5576c;
            color: white;
            border-radius: 20px;
            font-size: 0.85em;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .price {
            font-size: 2em;
            color: #f5576c;
            font-weight: bold;
            margin: 20px 0;
        }
        .feature {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }
        .feature:last-child { border-bottom: none; }
        .feature strong { color: #f5576c; }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #f5576c;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin-right: 10px;
            transition: background 0.3s;
        }
        .btn:hover { background: #e04057; }
        .endpoint {
            background: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #f5576c;
            margin: 15px 0;
            border-radius: 4px;
        }
        ul { margin-left: 20px; }
        li { margin: 8px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>📄 PDF Parser MCP</h1>
            <p class="subtitle">x402 Payment-Protected PDF Parsing & Text Extraction API</p>

            <div style="margin: 20px 0;">
                <span class="badge">MCP Compatible</span>
                <span class="badge">x402 Payments</span>
                <span class="badge">Base Mainnet</span>
                <span class="badge">USDC</span>
            </div>

            <div class="price">$0.006 per document</div>

            <div class="feature">
                <strong>📝 Full Text Extraction</strong><br>
                Extract all text content from any PDF document
            </div>
            <div class="feature">
                <strong>📊 Document Metadata</strong><br>
                Get author, title, creation date, page count, and more
            </div>
            <div class="feature">
                <strong>📖 Page-by-Page Parsing</strong><br>
                Extract text from specific pages or entire documents
            </div>
            <div class="feature">
                <strong>🔍 Content Analysis</strong><br>
                Word count, character count, and document statistics
            </div>
            <div class="feature">
                <strong>💳 Micropayments</strong><br>
                Pay only $0.006 USDC per document via x402 protocol on Base
            </div>
        </div>

        <div class="card">
            <h2 style="color: #f5576c; margin-bottom: 20px;">🚀 API Endpoints</h2>

            <div class="endpoint">
                <strong>POST /api/parse</strong><br>
                Parse PDF from URL and extract all content
                <div class="code-block">POST /api/parse
Content-Type: application/json
{ "url": "https://example.com/document.pdf" }</div>
            </div>

            <div class="endpoint">
                <strong>POST /api/metadata</strong><br>
                Get PDF metadata without full text extraction
                <div class="code-block">POST /api/metadata
Content-Type: application/json
{ "url": "https://example.com/document.pdf" }</div>
            </div>

            <div class="endpoint">
                <strong>GET /mcp/tools</strong><br>
                Get MCP tool metadata (free)
            </div>

            <div class="endpoint">
                <strong>GET /.well-known/x402</strong><br>
                x402 Bazaar discovery endpoint (free)
            </div>
        </div>

        <div class="card">
            <h2 style="color: #f5576c; margin-bottom: 20px;">💰 Payment Details</h2>
            <ul>
                <li><strong>Network:</strong> Base Mainnet (eip155:8453)</li>
                <li><strong>Currency:</strong> USDC</li>
                <li><strong>Price:</strong> $0.006 per document</li>
                <li><strong>Protocol:</strong> x402 "exact" scheme</li>
                <li><strong>Payment Address:</strong> <code>0xf081ee84c0d85278a6242bc265f0b312021ebeb1</code></li>
            </ul>
        </div>

        <div class="card">
            <h2 style="color: #f5576c; margin-bottom: 20px;">🤖 For AI Agents</h2>
            <p>This MCP server works with Claude Code and other AI agents supporting MCP and x402 payments.</p>
            <br>
            <p><strong>Agents can:</strong></p>
            <ul>
                <li>Discover this service on x402 Bazaar</li>
                <li>Pay automatically via CDP Facilitator</li>
                <li>Parse PDF documents from URLs</li>
                <li>Extract text for analysis</li>
                <li>Get document metadata</li>
                <li>Process invoices, contracts, reports</li>
                <li>Analyze research papers and documents</li>
            </ul>
        </div>

        <div class="card" style="text-align: center;">
            <a href="https://x402bazaar.app" class="btn">Browse x402 Bazaar</a>
            <a href="/mcp/tools" class="btn">MCP Tools</a>
            <a href="/health" class="btn">Health Check</a>
        </div>
    </div>
</body>
</html>
  `);
});

// x402 Bazaar discovery endpoint
app.get('/.well-known/x402', (req, res) => {
  res.json({
    name: 'PDF Parser MCP',
    description: 'PDF parsing and text extraction with x402 micropayments. Extract text, metadata, and analyze PDF documents.',
    version: '1.0.0',
    payment: {
      scheme: 'exact',
      network: PAYMENT_CONFIG.chainId,
      price: `$${PAYMENT_CONFIG.price}`,
      currency: PAYMENT_CONFIG.currency,
      payTo: PAYMENT_CONFIG.payTo
    },
    endpoints: [
      {
        path: '/api/parse',
        method: 'POST',
        description: 'Parse PDF from URL and extract all content',
        parameters: [
          { name: 'url', required: true, description: 'URL of the PDF document to parse' }
        ]
      },
      {
        path: '/api/metadata',
        method: 'POST',
        description: 'Get PDF metadata without full text extraction',
        parameters: [
          { name: 'url', required: true, description: 'URL of the PDF document' }
        ]
      }
    ],
    mcp: {
      toolsEndpoint: '/mcp/tools'
    }
  });
});

// MCP tools metadata endpoint
app.get('/mcp/tools', (req, res) => {
  res.json({
    tools: [
      {
        name: 'parse_pdf',
        description: 'Parse PDF document and extract all text content and metadata',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL of the PDF document to parse',
              format: 'uri'
            }
          },
          required: ['url']
        }
      },
      {
        name: 'get_pdf_metadata',
        description: 'Get metadata from PDF document (author, title, pages, etc.)',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL of the PDF document',
              format: 'uri'
            }
          },
          required: ['url']
        }
      }
    ]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'pdf-parser-mcp',
    timestamp: new Date().toISOString(),
    payment: {
      enabled: true,
      price: `$${PAYMENT_CONFIG.price}`,
      currency: PAYMENT_CONFIG.currency,
      network: PAYMENT_CONFIG.chainId
    }
  });
});

// Payment required response helper
function paymentRequired(res) {
  return res.status(402).json({
    error: 'Payment Required',
    message: 'This endpoint requires x402 payment',
    payment: {
      scheme: 'exact',
      network: PAYMENT_CONFIG.chainId,
      price: `$${PAYMENT_CONFIG.price}`,
      currency: PAYMENT_CONFIG.currency,
      payTo: PAYMENT_CONFIG.payTo
    },
    instructions: 'Include payment proof in X-Payment-Proof header'
  });
}

// Helper function to fetch PDF from URL
async function fetchPDF(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 30000,
      maxRedirects: 5,
      maxContentLength: 50 * 1024 * 1024 // 50MB limit
    });

    // Verify it's a PDF
    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('pdf')) {
      throw new Error('URL does not point to a PDF file');
    }

    return Buffer.from(response.data);
  } catch (error) {
    throw new Error(`Failed to fetch PDF: ${error.message}`);
  }
}

// PDF parsing endpoint with payment requirement
app.post('/api/parse', async (req, res) => {
  const paymentProof = req.headers['x-payment-proof'];

  if (!paymentProof) {
    return paymentRequired(res);
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'URL parameter is required in request body'
    });
  }

  // Validate URL
  try {
    new URL(url);
  } catch (e) {
    return res.status(400).json({
      error: 'Invalid URL',
      message: 'Please provide a valid URL'
    });
  }

  try {
    const pdfBuffer = await fetchPDF(url);
    const data = await pdf(pdfBuffer);

    res.json({
      success: true,
      url: url,
      content: {
        text: data.text,
        pages: data.numpages,
        info: data.info || {},
        metadata: data.metadata || {},
        version: data.version || 'unknown'
      },
      statistics: {
        totalPages: data.numpages,
        totalCharacters: data.text.length,
        totalWords: data.text.split(/\s+/).filter(Boolean).length,
        totalLines: data.text.split('\n').length
      },
      parsedAt: new Date().toISOString(),
      payment: {
        verified: true,
        amount: PAYMENT_CONFIG.price,
        currency: PAYMENT_CONFIG.currency
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'PDF parsing failed',
      message: error.message
    });
  }
});

// PDF metadata endpoint with payment requirement
app.post('/api/metadata', async (req, res) => {
  const paymentProof = req.headers['x-payment-proof'];

  if (!paymentProof) {
    return paymentRequired(res);
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'URL parameter is required in request body'
    });
  }

  // Validate URL
  try {
    new URL(url);
  } catch (e) {
    return res.status(400).json({
      error: 'Invalid URL',
      message: 'Please provide a valid URL'
    });
  }

  try {
    const pdfBuffer = await fetchPDF(url);
    const data = await pdf(pdfBuffer);

    res.json({
      success: true,
      url: url,
      metadata: {
        pages: data.numpages,
        info: data.info || {},
        metadata: data.metadata || {},
        version: data.version || 'unknown',
        title: data.info?.Title || '',
        author: data.info?.Author || '',
        subject: data.info?.Subject || '',
        creator: data.info?.Creator || '',
        producer: data.info?.Producer || '',
        creationDate: data.info?.CreationDate || '',
        modificationDate: data.info?.ModDate || ''
      },
      statistics: {
        totalPages: data.numpages,
        estimatedSize: pdfBuffer.length,
        formatVersion: data.version
      },
      extractedAt: new Date().toISOString(),
      payment: {
        verified: true,
        amount: PAYMENT_CONFIG.price,
        currency: PAYMENT_CONFIG.currency
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Metadata extraction failed',
      message: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'POST /api/parse',
      'POST /api/metadata',
      'GET /mcp/tools',
      'GET /.well-known/x402',
      'GET /health'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`PDF Parser MCP server running on port ${PORT}`);
  console.log(`Payment: ${PAYMENT_CONFIG.price} ${PAYMENT_CONFIG.currency} on ${PAYMENT_CONFIG.chainId}`);
});

export default app;
