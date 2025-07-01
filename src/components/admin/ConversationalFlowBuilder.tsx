import React, { useState, useCallback, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Play, 
  Square, 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  Upload,
  ArrowRight,
  Settings,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { TradeTemplate, FlowNode, FlowAnswer, FlowAction } from '@/types';

interface FlowBuilderProps {
  template: TradeTemplate | null;
  onClose: () => void;
}

interface CanvasNode extends FlowNode {
  x: number;
  y: number;
}

interface Connection {
  id: string;
  fromNode: string;
  fromAnswer: string;
  toNode: string;
}

const NodeType = {
  QUESTION: 'question',
  ACTION: 'action', 
  END: 'end'
} as const;

const ItemTypes = {
  NODE: 'node',
  PALETTE_ITEM: 'palette_item'
} as const;

// Draggable node component
const FlowNodeComponent: React.FC<{
  node: CanvasNode;
  isSelected: boolean;
  onSelect: (nodeId: string) => void;
  onMove: (nodeId: string, x: number, y: number) => void;
  onDelete: (nodeId: string) => void;
}> = ({ node, isSelected, onSelect, onMove, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.NODE,
    item: { id: node.node_id, x: node.x, y: node.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getNodeIcon = () => {
    switch (node.type) {
      case 'question':
        return <MessageSquare className="h-4 w-4" />;
      case 'action':
        return <Play className="h-4 w-4" />;
      case 'end':
        return <Square className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getNodeColor = () => {
    switch (node.type) {
      case 'question':
        return 'bg-blue-500';
      case 'action':
        return 'bg-green-500';
      case 'end':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      ref={drag}
      className={`absolute cursor-move ${isDragging ? 'opacity-50' : ''}`}
      style={{ left: node.x, top: node.y }}
      onClick={() => onSelect(node.node_id)}
    >
      <Card className={`w-48 shadow-lg hover:shadow-xl transition-shadow ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`p-1 rounded text-white ${getNodeColor()}`}>
                {getNodeIcon()}
              </div>
              <Badge variant="outline" className="text-xs">
                {node.type}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(node.node_id);
              }}
              className="h-6 w-6 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-sm font-medium truncate">
            {node.question || node.node_id}
          </div>
          {node.answers && node.answers.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              {node.answers.length} answer{node.answers.length !== 1 ? 's' : ''}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Palette item for dragging new nodes
const PaletteItem: React.FC<{
  type: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}> = ({ type, icon, label, color }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PALETTE_ITEM,
    item: { nodeType: type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-move transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center space-x-2">
        <div className={`p-2 rounded text-white ${color}`}>
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
};

// Main canvas component
const FlowCanvas: React.FC<{
  nodes: CanvasNode[];
  selectedNode: string | null;
  onNodeSelect: (nodeId: string) => void;
  onNodeMove: (nodeId: string, x: number, y: number) => void;
  onNodeAdd: (type: string, x: number, y: number) => void;
  onNodeDelete: (nodeId: string) => void;
}> = ({ nodes, selectedNode, onNodeSelect, onNodeMove, onNodeAdd, onNodeDelete }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: [ItemTypes.NODE, ItemTypes.PALETTE_ITEM],
    drop: (item: any, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      
      if (clientOffset && canvasRect) {
        const x = clientOffset.x - canvasRect.left;
        const y = clientOffset.y - canvasRect.top;
        
        if ('nodeType' in item) {
          // Adding new node from palette
          onNodeAdd(item.nodeType, x - 96, y - 50); // Center the node
        } else {
          // Moving existing node
          onNodeMove(item.id, x - 96, y - 50);
        }
      }
    },
  });

  return (
    <div 
      ref={(node) => {
        drop(node);
        canvasRef.current = node;
      }}
      className="relative w-full h-full bg-gray-50 overflow-hidden"
      style={{ minHeight: '600px' }}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Render nodes */}
      {nodes.map((node) => (
        <FlowNodeComponent
          key={node.node_id}
          node={node}
          isSelected={selectedNode === node.node_id}
          onSelect={onNodeSelect}
          onMove={onNodeMove}
          onDelete={onNodeDelete}
        />
      ))}
      
      {/* Render connections */}
      <svg className="absolute inset-0 pointer-events-none">
        {nodes.map((node) => 
          node.answers?.map((answer) => {
            if (!answer.next_node_id) return null;
            
            const targetNode = nodes.find(n => n.node_id === answer.next_node_id);
            if (!targetNode) return null;
            
            const startX = node.x + 192; // node width
            const startY = node.y + 60; // approximate center
            const endX = targetNode.x;
            const endY = targetNode.y + 60;
            
            return (
              <g key={`${node.node_id}-${answer.answer_id}`}>
                <path
                  d={`M ${startX} ${startY} Q ${(startX + endX) / 2} ${startY} ${endX} ${endY}`}
                  stroke="#6B7280"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              </g>
            );
          })
        )}
        
        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#6B7280"
            />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

// Node properties panel
const NodePropertiesPanel: React.FC<{
  node: CanvasNode | null;
  onUpdateNode: (nodeId: string, updates: Partial<FlowNode>) => void;
}> = ({ node, onUpdateNode }) => {
  if (!node) {
    return (
      <div className="p-6 text-center text-gray-500">
        Select a node to edit its properties
      </div>
    );
  }

  const handleQuestionChange = (value: string) => {
    onUpdateNode(node.node_id, { question: value });
  };

  const handleAddAnswer = () => {
    const newAnswer: FlowAnswer = {
      answer_id: `answer_${Date.now()}`,
      text: 'New Answer',
      value: '',
      actions: []
    };
    
    const answers = [...(node.answers || []), newAnswer];
    onUpdateNode(node.node_id, { answers });
  };

  const handleUpdateAnswer = (answerId: string, updates: Partial<FlowAnswer>) => {
    const answers = node.answers?.map(answer => 
      answer.answer_id === answerId ? { ...answer, ...updates } : answer
    ) || [];
    onUpdateNode(node.node_id, { answers });
  };

  const handleDeleteAnswer = (answerId: string) => {
    const answers = node.answers?.filter(answer => answer.answer_id !== answerId) || [];
    onUpdateNode(node.node_id, { answers });
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Node Properties</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="node-type">Node Type</Label>
              <Select value={node.type} disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="end">End</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {node.type === 'question' && (
              <div>
                <Label htmlFor="question-text">Question Text</Label>
                <Textarea
                  id="question-text"
                  value={node.question || ''}
                  onChange={(e) => handleQuestionChange(e.target.value)}
                  placeholder="Enter your question here..."
                  rows={3}
                />
              </div>
            )}

            <div>
              <Label htmlFor="field-id">Link to Quote Field</Label>
              <Select value={node.field_id || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer_name">Customer Name</SelectItem>
                  <SelectItem value="project_location">Project Location</SelectItem>
                  <SelectItem value="roof_type">Roof Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {node.type === 'question' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Answer Options</h4>
              <Button size="sm" onClick={handleAddAnswer}>
                <Plus className="h-4 w-4 mr-2" />
                Add Answer
              </Button>
            </div>

            <div className="space-y-4">
              {node.answers?.map((answer, index) => (
                <Card key={answer.answer_id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Answer {index + 1}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAnswer(answer.answer_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Answer Text</Label>
                      <Input
                        value={answer.text}
                        onChange={(e) => handleUpdateAnswer(answer.answer_id, { text: e.target.value })}
                        placeholder="Answer text"
                      />
                    </div>
                    <div>
                      <Label>Answer Value</Label>
                      <Input
                        value={answer.value || ''}
                        onChange={(e) => handleUpdateAnswer(answer.answer_id, { value: e.target.value })}
                        placeholder="Value to store"
                      />
                    </div>
                    <div>
                      <Label>Next Node</Label>
                      <Select value={answer.next_node_id || ''}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select next node" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          <SelectItem value="end">End Flow</SelectItem>
                          {/* In real app, populate with available nodes */}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

const ConversationalFlowBuilder: React.FC<FlowBuilderProps> = ({ template, onClose }) => {
  const [nodes, setNodes] = useState<CanvasNode[]>([
    {
      node_id: 'start',
      type: 'question',
      question: 'Welcome! What type of project are you planning?',
      x: 100,
      y: 100,
      answers: [
        {
          answer_id: 'residential',
          text: 'Residential',
          value: 'residential',
          next_node_id: 'location'
        },
        {
          answer_id: 'commercial',
          text: 'Commercial',
          value: 'commercial',
          next_node_id: 'location'
        }
      ]
    },
    {
      node_id: 'location',
      type: 'question',
      question: 'What is the project location?',
      x: 400,
      y: 200,
      answers: []
    }
  ]);
  
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNode(nodeId);
  }, []);

  const handleNodeMove = useCallback((nodeId: string, x: number, y: number) => {
    setNodes(prev => prev.map(node => 
      node.node_id === nodeId ? { ...node, x, y } : node
    ));
  }, []);

  const handleNodeAdd = useCallback((type: string, x: number, y: number) => {
    const newNode: CanvasNode = {
      node_id: `node_${Date.now()}`,
      type: type as 'question' | 'action' | 'end',
      question: type === 'question' ? 'New Question' : undefined,
      x,
      y,
      answers: type === 'question' ? [] : undefined,
      actions: type === 'action' ? [] : undefined
    };
    
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode.node_id);
  }, []);

  const handleNodeDelete = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(node => node.node_id !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<FlowNode>) => {
    setNodes(prev => prev.map(node => 
      node.node_id === nodeId ? { ...node, ...updates } : node
    ));
  }, []);

  const selectedNodeData = nodes.find(node => node.node_id === selectedNode);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex">
        {/* Left Sidebar - Node Palette */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Node Palette</h3>
              <div className="space-y-3">
                <PaletteItem
                  type="question"
                  icon={<MessageSquare className="h-4 w-4" />}
                  label="Question"
                  color="bg-blue-500"
                />
                <PaletteItem
                  type="action"
                  icon={<Play className="h-4 w-4" />}
                  label="Action"
                  color="bg-green-500"
                />
                <PaletteItem
                  type="end"
                  icon={<Square className="h-4 w-4" />}
                  label="End"
                  color="bg-red-500"
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Flow Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Save className="h-4 w-4 mr-2" />
                  Save Flow
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="font-semibold">
                  {template ? template.name : 'New Flow'}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-500">100%</span>
                  <Button variant="outline" size="sm">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Flow
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1">
            <FlowCanvas
              nodes={nodes}
              selectedNode={selectedNode}
              onNodeSelect={handleNodeSelect}
              onNodeMove={handleNodeMove}
              onNodeAdd={handleNodeAdd}
              onNodeDelete={handleNodeDelete}
            />
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-white border-l border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Properties
            </h3>
          </div>
          <NodePropertiesPanel
            node={selectedNodeData || null}
            onUpdateNode={handleUpdateNode}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default ConversationalFlowBuilder;
