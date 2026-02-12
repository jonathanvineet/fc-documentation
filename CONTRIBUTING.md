# Contributing to Documentation

Thank you for your interest in improving the ELCO F7 flight controller documentation!

## How to Contribute

### Reporting Issues

Found an error or unclear section?

1. Check if issue already reported: [Issues](https://github.com/jonathanvineet/fc-documentation/issues)
2. Create new issue with:
   - Document name and section
   - Description of problem
   - Suggested improvement (if applicable)
   - Screenshots (if helpful)

### Suggesting Improvements

Have ideas for better explanations or additional content?

1. Open an issue tagged `enhancement`
2. Describe your suggestion
3. Explain why it would help users

### Contributing Content

Want to contribute content directly?

#### Small Changes (typos, clarifications)

1. Fork the repository
2. Edit the file directly on GitHub
3. Submit pull request
4. Wait for review

#### Large Changes (new sections, major rewrites)

1. Open an issue first to discuss
2. Wait for approval from maintainers
3. Fork the repository
4. Create feature branch: `git checkout -b improve-wiring-guide`
5. Make your changes
6. Test formatting (Markdown preview)
7. Commit with clear message
8. Push and submit pull request

## Documentation Standards

### Writing Style

- **Clear and concise** - Short sentences, simple words
- **Instructional tone** - Direct, action-oriented
- **Technical accuracy** - Verify all specs and procedures
- **Beginner-friendly** - Explain jargon, provide context
- **Safety-conscious** - Emphasize warnings

### Formatting

**Headers:**
```markdown
# Main Title (H1 - once per document)
## Section (H2)
### Subsection (H3)
#### Detail (H4)
```

**Lists:**
```markdown
Unordered:
- Item
- Item

Ordered:
1. Step one
2. Step two

Checklists:
- [ ] Not done
- [x] Done
```

**Code Blocks:**
````markdown
```language
code here
```
````

**Tables:**
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

**Callouts:**
```markdown
> ⚠️ **WARNING:** Important safety information

> **Note:** Additional information
```

### File Organization

- One document = One main topic
- Use relative links between documents
- Place images in `/docs/images/`
- Place diagrams in `/docs/diagrams/`

### Cross-References

Link to other sections:
```markdown
See [Wiring Guide](./wiring-guide.md) for details.
See [Hardware Specs](./hardware-specifications.md#power-system)
```

## What to Contribute

### High Priority

- Missing diagrams and images
- Testing procedures on real hardware
- Video tutorials
- Translations
- Troubleshooting entries from real issues

### Always Welcome

- Fixing typos and grammar
- Clarifying confusing sections
- Adding examples
- Updating outdated information
- Improving formatting

### Needs Discussion First

- Major restructuring
- Removing existing content
- Changing terminology
- Adding new main sections

## Testing Your Changes

Before submitting:

1. **Markdown Validation**
   - Preview in Markdown editor
   - Check all links work
   - Verify table formatting

2. **Content Review**
   - Technical accuracy
   - Completeness
   - Clarity
   - No broken instructions

3. **Style Check**
   - Consistent with existing docs
   - Proper heading hierarchy
   - Correct terminology

## Review Process

1. **Submission** - You submit PR
2. **Automated Checks** - Link checking, Markdown linting
3. **Technical Review** - Maintainer checks accuracy
4. **Community Feedback** - Others may comment
5. **Revision** - Make requested changes
6. **Approval** - Maintainer approves
7. **Merge** - Changes go live

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Credited in relevant documentation sections

## Questions?

- Documentation issues: Open GitHub issue
- General questions: Discord or forum
- Technical support: support@elco-fc.com

## Code of Conduct

Be respectful, constructive, and helpful. We're all here to improve the documentation for the community.

---

Thank you for contributing to better flight controller documentation!
